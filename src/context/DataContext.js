import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../api/Posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]); // always an array
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');

  const navigate = useNavigate();
  const { width } = useWindowSize();

  // Fetch posts from backend
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3501/posts');

  // Ensure data is an array
  useEffect(() => {
    if (Array.isArray(data)) {
      setPosts(data);
    } else {
      console.warn("API did not return an array:", data);
      setPosts([]);
    }
  }, [data]);

  // Search filter logic (safe)
  useEffect(() => {
    console.log("Posts value:", posts);

    if (!Array.isArray(posts)) {
      console.log(" Posts is not an array, resetting it to []");
      setPosts([]);
      return;
    }

    const filteredResults = posts.filter((post) =>
      post.body.toLowerCase().includes(search.toLowerCase()) ||
      post.title.toLowerCase().includes(search.toLowerCase())
    );

    setSearchResults(filteredResults.reverse());
  }, [posts, search]);

  //  Create new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    try {
      const response = await api.post('/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      navigate('/');
    } catch (err) {
      console.error(`Error creating post: ${err.message}`);
    }
  };

  //  Edit post
  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const updatedPost = { id, title: editTitle, datetime, body: editBody };

    try {
      const response = await api.put(`/posts/${id}`, updatedPost);
      setPosts(posts.map(post => post.id === id ? { ...response.data } : post));
      setEditTitle('');
      setEditBody('');
      navigate('/');
    } catch (err) {
      console.error(`Error editing post: ${err.message}`);
    }
  };

  //  Delete post
  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      navigate('/');
    } catch (err) {
      console.error(`Error deleting post: ${err.message}`);
    }
  };

  return (
    <DataContext.Provider
      value={{
        width,
        search, setSearch,
        searchResults,
        fetchError,
        isLoading,
        handleSubmit,
        postTitle, setPostTitle,
        postBody, setPostBody,
        posts,
        handleEdit,
        editTitle, setEditTitle,
        editBody, setEditBody,
        handleDelete
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
