import React, { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { auth, firestore } from "../../Firebase/firebaseConfig";
import usePostsHook from "../../CustomHooks/usePostsHook";
import GetPostsData from "./GetPostsData";
import { useAuthState } from "react-firebase-hooks/auth";
import PostLoader from "./PostLoader";
import { Flex, Button, Stack } from "@chakra-ui/react";
import { IoArrowBackOutline, IoArrowForwardOutline } from "react-icons/io5";

const GetPosts = ({ communityData }) => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    postStateValue,
    setPostStateValue,
    getVotes,
    deletePost,
    getSelectPost,
  } = usePostsHook();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postQuery = query(
          collection(firestore, "posts"),
          where("communityId", "==", communityData.id),
          orderBy("createdAt", "desc")
        );
  
        const unsubscribe = onSnapshot(postQuery, (snapshot) => {
          const posts = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setPostStateValue((prev) => ({
            ...prev,
            allPosts: posts,
          }));
  
          setCurrentPage((prev) =>
            Math.min(prev, Math.ceil(posts.length / postsPerPage))
          );
          setLoading(false);
        });
  
        return () => unsubscribe(); 
      } catch (error) {
        console.error("Error getting posts", error);
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, [communityData.id, currentPage]);
  

  const handlePageChange = (newPage) => {
    if (newPage === currentPage) {
      return;
    }
    setCurrentPage(newPage);
  };

  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts =
    postStateValue.allPosts?.slice(startIndex, endIndex) || [];

  return (
    <>
      {loading ? (
        <PostLoader />
      ) : (
        <Stack>
          {paginatedPosts.map((post) => (
            <GetPostsData
              key={post.id}
              post={post}
              userIsCreator={user?.uid === post.creatorId}
              userVote={
                postStateValue.postVotes.find((vote) => vote.postId === post.id)
                  ?.voteValue
              }
              getVotes={getVotes}
              getSelectPost={getSelectPost}
              deletePost={deletePost}
            />
          ))}
        </Stack>
      )}
      <Flex justify="center" mt={4} align="center">
        <Button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          mr={2}
          bg="blue.800"
        >
          <IoArrowBackOutline />
        </Button>
        {Array.from(
          { length: Math.ceil(postStateValue.allPosts?.length / postsPerPage) },
          (_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? "solid" : "outline"}
              mr={2}
              borderRadius={5}
            >
              {index + 1}
            </Button>
          )
        )}
        <Button
          disabled={
            currentPage ===
            Math.ceil(postStateValue.allPosts?.length / postsPerPage)
          }
          onClick={() => handlePageChange(currentPage + 1)}
          ml={2}
          borderRadius="50%"
          bg="blue.800"
        >
          <IoArrowForwardOutline />
        </Button>
      </Flex>
    </>
  );
};

export default GetPosts;
