import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useState } from 'react';
import { Paper, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
function ShelfPage() {
  const items = useSelector(store => store.shelfReducer);
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  // console.log(user.id);

  const [newDescription, setNewDescription] = useState('');
  const [newImage, setNewImage] = useState('');
  const [editable, setEditable] = useState(false);
  const [editId, setEditId] = useState(0);

  const handleSubmit = () => {
    const newObj = {
      description: newDescription,
      image_url: newImage,
    };


    if (!editable) {
      dispatch({ type: "ADD_ITEM", payload: newObj });
    } else if (editable) {
      const objUpdate = {
        id: Number(editId),
        description: newDescription,
        image_url: newImage
      };
      dispatch({ type: "EDIT_ITEM", payload: objUpdate });
    }
    setNewDescription("");
    setNewImage("");
  };
  console.log(user);

  const deleteItem = (id, user_id) => {
    if (user_id === user.id) {

      dispatch({ type: "DELETE_ITEM", payload: id });
    } else {
      alert('You cannot delete this item');
    }

  };

  const editItem = (id, user_id) => {
    if (user_id === user.id) {

      setEditId(id);
      setEditable(!editable);
    } else {
      alert('You cannot edit this item');
    }
  };
  console.log("is editable?", editable);

  useEffect(() => {
    dispatch({ type: "FETCH_SHELF" });
  }, []);
  return (
    <div className="container">
      <section className='page-heading'>
        <h2 className='shelf-title'>Shelf</h2>
        <h3 className='shelf-h3'> {editable ? 'Edit Item' : 'Add New Item'}</h3>
        <div className='shelf-form-container'>
          <div className='shelf-inputs'>
            <input placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <input placeholder="Image URL" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
          </div>
          <Button onClick={handleSubmit} variant="outlined">submit</Button>
        </div>
      </section>
      <Box className="items-container">
        {items.map((item, index) => {
          if (item.user_id === user.id) {
            return (
              <Paper key={index} variant="outlined" elevation={6} className="item-paper">
                <Typography component={"p"} >{item.description}</Typography>
                <img src={item.image_url} className="list-img" />
                <h3><button class="logInButton" onClick={() => deleteItem(item.id, item.user_id)}>Delete</button>
                  <button class="logInButton" onClick={() => editItem(item.id, item.user_id)}>Edit</button></h3>
              </Paper>);
          } else {
            return (
              <Paper key={index} elevation={20} className="item-paper">
                <Typography>{item.description}</Typography>
                <img src={item.image_url} className="list-img" />
              </Paper>
            );
          }
        })}
      </Box>
    </div>

  );
}

export default ShelfPage;
