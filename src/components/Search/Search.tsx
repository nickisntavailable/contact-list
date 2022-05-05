import { addContactFromUser } from "app/actions/actionData";
import { RootState } from "app/constants";
import { TUser } from "app/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Search.scss";

const Search = () => {
  const [val, setVal] = useState<string>("");
  const variants = useSelector<RootState>(
    (state) => state.data.contactList
  ) as TUser[];
  const [show, setShow] = useState<boolean>(false);
  const [filteredVariants, setFilteredVariants] = useState<TUser[]>();
  const ref = useRef<number>();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.clearInterval(ref.current);
    setVal(e.target.value);
    ref.current = window.setTimeout(
      () =>
        setFilteredVariants(
          variants.filter((p) =>
            p.name.toLowerCase().includes(e.target.value.toLowerCase())
          )
        ),
      300
    );
  };

  const handleItemClick = (id: string) => {
      dispatch(addContactFromUser(id))
      setVal('')
      setShow(false)
  }

  useEffect(() => {
      const clickOutside = (e: MouseEvent) => {
          if(inputRef.current && !inputRef.current?.contains(e.target as Node)) {
              inputRef.current.blur()
              setShow(false)
          }
      }
      document.addEventListener('click', clickOutside)
      return () => document.removeEventListener('click', clickOutside)
  }, [])

  return (
    <div className="search">
      <input
        type="text"
        value={val}
        ref={inputRef}
        onChange={handleChange}
        onFocus={() => setShow(true)}
        placeholder="Search"
        className="search-input"
      />
      {show && val.length > 0 && (
        <div className="search-variants">
          {filteredVariants && filteredVariants.length !== 0 ? (
            filteredVariants.map((e) => (
              <div className="search-variants-item" key={e.id} onClick={() => handleItemClick(e.id)}>
                {e.name}
              </div>
            ))
          ) : (
            <div className="search-variants-item">Empty</div>
          )}
        </div>
      )}
    </div>
  );
};
export default Search;
