import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context";
import axios from "axios";
import classes from "./styles.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { blogList, setBlogList, pending, setPending } =
    useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
    setPending(true);
    const response = await axios.get("http://localhost:5000/api/blogs/");
    const result = await response?.data;

    if (result?.blogList?.length > 0) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handleDeleteBlog(currentId) {
    const response = await axios.delete(
      `http://localhost:5000/api/blogs/delete/${currentId}`
    );

    const result = await response.data;

    if (result?.message) {
      fetchListOfBlogs();
    }
  }

  function handleEdit(currentBlogItem) {
    navigate("/add-blog", { state: { currentBlogItem } });
  }

  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <div className={classes.wrapper}>
      <h1>Blog List</h1>
      {pending ? (
        <h1>Blogs Loading. Please Wait.</h1>
      ) : (
        <div className={classes.blogList}>
          {blogList.map((blogItem) => (
            <div key={blogItem._id}>
              <p>{blogItem.title}</p>
              <p>{blogItem.description}</p>
              <FaEdit onClick={() => handleEdit(blogItem)} size={30} />
              <FaTrash
                onClick={() => handleDeleteBlog(blogItem._id)}
                size={30}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
