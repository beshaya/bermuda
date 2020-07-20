import React from 'react';
import { firestore, TileInfo } from '../firebase';
import { useForm } from "react-hook-form";

export function TileEditor(props: {tileInfo: TileInfo, tileName: string}) {
  const { register, setValue, handleSubmit, errors } = useForm<TileInfo>();
  const onSubmit = handleSubmit(({ bg_color, bg_image, hover_text, description_text, link }) => {
    const tile = firestore.collection("tiles").doc(props.tileName);
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
      <h2>{props.tileName}</h2>
      <label>Color
        <input 
          name="bg_color"
          type="text"
          key={`bg_color:${props.tileInfo.bg_color}`}
          defaultValue={props.tileInfo.bg_color}
          ref={register}
        />
      </label>
      <br />
      <label>Image
        <input
          name="bg_image"
          type="text"
          key={`bg_image:${props.tileInfo.bg_image}`}
          defaultValue={props.tileInfo.bg_image}
          ref={register}
        />
      </label>
      <br />
      <label>Hover Text
        <input
          name="hover_text"
          type="text"
          key={`hover_text:${props.tileInfo.hover_text}`}
          defaultValue={props.tileInfo.hover_text}
          ref={register}
          />
      </label>
      <br />
      <label>Description Text
        <input
          name="description_text"
          type="text"
          key={`description_text:${props.tileInfo.description_text}`}
          defaultValue={props.tileInfo.description_text}
          ref={register}
        />
      </label>
      <br />
      <label>Link
       <input
         name="link"
         type="text"
         key={`link:${props.tileInfo.link}`}
         defaultValue={props.tileInfo.link}
         ref={register} />
      </label>
      <br />
      <input type="submit" value="Update Tile" />
    </form>
  );
};

export default TileEditor;