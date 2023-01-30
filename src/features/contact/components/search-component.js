import React, { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Searchbar } from "react-native-paper";
import styled from "styled-components";
import {
  loadAllContacts,
  filterList,
} from "../../../redux/store/slices/contactListSlice";

const SearchContainer = styled.View`
  padding: ${(props) => props.theme.space[3]};
`;

const Search = ({ isFavouritesToggled, onFavouritesToggle }) => {
  const dispatch = useDispatch();
  const contacts = useSelector(loadAllContacts);

  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search contact..."
        value={searchKeyword}
        icon={isFavouritesToggled ? "heart" : "heart-outline"}
        onIconPress={() => {
          dispatch(filterList(contacts, searchKeyword));
        }}
        onChangeText={(text) => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};

export default Search;
