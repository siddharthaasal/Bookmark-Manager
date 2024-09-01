// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./styles/AddBookmarkForm.css";

// interface Bookmark {
//   id: number;
//   name: string;
//   description: string;
//   link: string;
// }

// interface BookmarkFormProps {
//   categoryId: number | null;
// }

// const AddBookmarkForm: React.FC<BookmarkFormProps> = ({ categoryId }) => {
  

//   const [newBookmark, setNewBookmark] = useState<Partial<Bookmark>>({
//     name: "",
//     description: "",
//     link: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setNewBookmark((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!categoryId) {
//       console.error("Category ID is required to add a bookmark");
//       return;
//     }

//     try {
//       await axios.post(
//         `http://localhost:8081/bookmarks/${categoryId}/`,
//         newBookmark
//       );
//       setNewBookmark({ name: "", description: "", link: "" });
//     } catch (error) {
//       console.error("Failed to add bookmark", error);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit} className="add-bookmark-form">
//         <input
//           type="text"
//           name="name"
//           value={newBookmark.name}
//           onChange={handleChange}
//           placeholder="Bookmark Name"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           value={newBookmark.description}
//           onChange={handleChange}
//           placeholder="Description"
//           required
//         />
//         <input
//           type="text"
//           name="link"
//           value={newBookmark.link}
//           onChange={handleChange}
//           placeholder="Bookmark URL"
//           required
//         />
//         <button type="submit">Add Bookmark</button>
//       </form>
//     </>
//   );
// };

// export default AddBookmarkForm;
