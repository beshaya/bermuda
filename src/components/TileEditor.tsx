import React from 'react';
import { firestore, TileInfo } from '../firebase';
import { useForm } from "react-hook-form";

export function TileEditor(props: {tileInfo: TileInfo, tileName: string}) {
  const { register, handleSubmit, errors } = useForm<TileInfo>();
  const onSubmit = handleSubmit(({ bg_color, bg_image, hover_text, description_text, link }) => {
    console.log({ bg_color, bg_image, hover_text, description_text, link });
    var tile = firestore.collection("tiles").doc(props.tileName);
    return tile.update({ 
      bg_color: bg_color,
      bg_image: bg_image,
      hover_text: hover_text,
      description_text: description_text,
      link: link
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        console.error("Error updating document: ", error);
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <label>Color
        <input name="bg_color" defaultValue ={props.tileInfo.bg_color} ref={register} />
      </label>
      <br />
      <label>Image
        <input name="bg_image" defaultValue ={props.tileInfo.bg_image} ref={register} />
      </label>
      <br />
      <label>Hover Text
        <input name="hover_text" defaultValue ={props.tileInfo.hover_text} ref={register} />
      </label>
      <br />
      <label>Description Text
       <input name="description_text" defaultValue={props.tileInfo.description_text} ref={register} />
      </label>
      <br />
      <label>Link
       <input name="link" defaultValue ={props.tileInfo.link} ref={register} />
      </label>
      <br />
      <input type="submit" value="Update Tile" />
    </form>
  );
};

export default TileEditor;