import { ChangeEvent, ChangeEventHandler, useState } from "react";
import { TextField } from "components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";

export function SearchBar() {
  const [search, setSearch] = useState("");

  const handleSetSearch = (callback: (val: string) => any) => {
    return (e: ChangeEvent<HTMLInputElement>) => {
      return callback(e.target.value);
    };
  };

  const submitSearch = console.log;

  return (
    <TextField.Uncontrolled
      size="md"
      placeholder="Pesquisar no histórico"
      name="search"
      variant="flat"
      value={search}
      onChange={handleSetSearch(setSearch)}
      classNames={{ inputWrapper: "pl-3 pr-0" }}
      endContent={
        <Button
          isIconOnly
          variant="light"
          className="mx-0"
          onClick={submitSearch}
        >
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      }
    />
  );
}
