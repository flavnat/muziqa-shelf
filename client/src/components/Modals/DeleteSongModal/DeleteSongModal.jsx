import React from "react";
import Modal from "../Modal";
import { ModalActions, SubmitButton  , CancelButton} from "./DeleteSongModal.styles";

export default function DeleteSongModal({ songId, onClose, onDelete }) {
  return (
    <Modal title="Delete Song" subTitle={"This action cannot be undone."} onClose={onClose}>
      <>
        {/* <ModalTitle>Confirm Deletion</ModalTitle> */}
        {/* <Message>Are you sure you want to delete this song?</Message> */}
        <ModalActions>
          <SubmitButton onClick={() => onDelete(songId)}>Delete</SubmitButton>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
        </ModalActions>
      </>
    </Modal>
  );
}