import { useParams, Link } from "react-router-dom"
import { useContext } from "react";
import DataContext from './context/DataContext';

const Postpage = () => {
  const {posts, handledelete } = useContext(DataContext);
  const { id } = useParams();
  const post = posts.find(post => (post.id).toString () === id);
  return (
    <article className="Postpage">
      {post &&
        <>
          <h2>{post.title}</h2>
          <p className="postDate">{post.datetime}</p>
          <p className="postBody">{post.body}</p>
          <Link to={`/edit/${post.id}`}><button className="editButton">EditPost</button></Link>
          <button className="deleteButton"onClick={() => handledelete(post.id)}> Delete Post</button>
        </>
      }
      {!post &&
        <>
          <h2>Post Not Found</h2>
          <p>Well, that's disapponiting.</p>
          <p>
            <Link to='/'>Visit Our Homepage</Link>
          </p>
        </>
      }
    </article>
  )
}

export default Postpage