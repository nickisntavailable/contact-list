import { changeContactName, removeContactFromUser } from "app/actions/actionData";
import { RootState } from "app/constants";
import { TUser } from "app/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./ContactItem.scss";

const ContactItem = ({ contactId }: { contactId: string }) => {
  const [value, setValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null)
  const contact = useSelector<RootState>((state) =>
    state.data.user.contacts.filter((e) => e.id === contactId).pop()
  ) as TUser;
  const dispatch = useDispatch();
  useEffect(() => {
    if (contact) {
      setValue(contact.name);
    }
  }, [contact]);
  return (
    <div className="contacts-item">
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => dispatch(changeContactName(contact.id, value))}
        onKeyDown={(e) => {
          if(e.key === 'Enter') {
            inputRef?.current?.blur()
            dispatch(changeContactName(contact.id, value))
          }
        }}
      />
      <button
        className="contacts-item-remove"
        onClick={() => dispatch(removeContactFromUser(contactId))}
      />
    </div>
  );
};

export default ContactItem;
