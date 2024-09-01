import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/BookmarkList.css";
import DeleteIcon from "@mui/icons-material/Delete";

interface Bookmark {
  id: number;
  name: string;
  description: string;
  link: string;
}

interface BookmarkListProps {
  categoryId: number | null;
}

const BookmarkList: React.FC<BookmarkListProps> = ({ categoryId }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newBookmark, setNewBookmark] = useState<Partial<Bookmark>>({
    name: "",
    description: "",
    link: "",
  });

  const handleAddBookmarkClick = () => {
    setShowForm(!showForm);
  };

  const handleDeleteBookmark = async (bookmarkId: number) => {
    try {
      await axios.delete(`http://localhost:8081/bookmarks/${bookmarkId}`);
      fetchBookmarks();
    } catch (error) {
      console.error("Failed to delete bookmark", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBookmark((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId) {
      console.error("Category ID is required to add a bookmark");
      return;
    }
    try {
      await axios.post(
        `http://localhost:8081/bookmarks/${categoryId}/`,
        newBookmark
      );
      setNewBookmark({ name: "", description: "", link: "" });
      fetchBookmarks(); // Re-fetch bookmarks after adding a new one
    } catch (error) {
      console.error("Failed to add bookmark", error);
    } finally {
      handleAddBookmarkClick();
    }
  };

  const fetchBookmarks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/bookmarks/${categoryId}/`
      );
      setBookmarks(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch bookmarks");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, [categoryId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="bookmark-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Link</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookmarks.map((bookmark) => (
              <tr key={bookmark.id}>
                <td>{bookmark.name}</td>
                <td>{bookmark.description}</td>
                <td>
                  <a
                    href={bookmark.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </a>
                </td>
                <td>
                  <DeleteIcon
                    onClick={() => handleDeleteBookmark(bookmark.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleAddBookmarkClick}>
        {showForm ? "Cancel" : "Add Bookmark"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="add-bookmark-form">
          <input
            type="text"
            name="name"
            value={newBookmark.name}
            onChange={handleChange}
            placeholder="Bookmark Name"
            required
          />
          <input
            type="text"
            name="description"
            value={newBookmark.description}
            onChange={handleChange}
            placeholder="Description"
            required
          />
          <input
            type="text"
            name="link"
            value={newBookmark.link}
            onChange={handleChange}
            placeholder="Bookmark URL"
            required
          />
          <button type="submit">Add Bookmark</button>
        </form>
      )}
    </>
  );
};

export default BookmarkList;
