import { removeContactFromUser } from "app/actions/actionData";
import { RootState } from "app/constants";
import { TUser } from "app/types";
import { useDispatch, useSelector } from "react-redux";
import "./ContactItem.scss";

const ContactItem = ({ contactId }: { contactId: string }) => {
  const contact = useSelector<RootState>((state) =>
    state.data.user.contacts.filter((e) => e.id === contactId).pop()
  ) as TUser;
  const dispatch = useDispatch();
  return (
    <div className="contacts-item">
      <p>{contact.name}</p>
      <button
        className="contacts-item-remove"
        onClick={() => dispatch(removeContactFromUser(contactId))}
      />
    </div>
  );
};

export default ContactItem;
