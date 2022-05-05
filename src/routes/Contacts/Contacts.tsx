import { RootState } from "app/constants";
import ContactItem from "components/ContactItem/ContactItem";
import Search from "components/Search/Search";
import { useSelector } from "react-redux";
import "./Contacts.scss";

const Contacts = () => {
  const contactList = useSelector<RootState>((state) =>
    state.data.user.contacts.map((e) => e.id)
  ) as string[];

  return (
    <div className="contacts">
      <h1>Contacts</h1>
      <Search />
      {contactList.length !== 0 ? (
        contactList.map((e) => <ContactItem contactId={e} key={e} />)
      ) : (
        <p>Contact list is empty</p>
      )}
    </div>
  );
};

export default Contacts;
