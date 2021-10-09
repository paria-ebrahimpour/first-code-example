import useHttp from "../../hooks/use-http";
import Section from "../../components/UI/Section";
import AddressItem from "./AddressItem";
import classes from "./AddressList.module.css";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";

const AddressList = (props) => {
  const [addresses, setAddresses] = useState([]);

  const { isLoading, error } = useHttp();

  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await fetch(
        "https://first-pwa-4cb00-default-rtdb.firebaseio.com/addresses.json"
      );
      const responseData = await response.json();
      const loadedAddresses = [];
      for (const a in responseData) {
        loadedAddresses.push({
          id: a,
          city: responseData[a].city,
          address: responseData[a].address,
          postalCode: responseData[a].postalCode,
        });
      }
      setAddresses(loadedAddresses);
    };
    fetchAddresses();
  }, []);

  let addressList = <h4>آدرسی وجود ندارد. لطفا آدرس خود را وارد کنید</h4>;

  if (addresses.length > 0) {
    addressList = (
      <ul>
        {addresses.map((address) => (
          <AddressItem
            key={address.id}
            id={address.id}
            city={address.city}
            address={address.address}
            postalCode={address.postslCode}
          >
            <span>
              {address.city} - {address.address}
            </span>
          </AddressItem>
        ))}
      </ul>
    );
  }

  let content = addressList;

  // if (error) {
  //   content = <Button onClick={}>دوباره سعی کنید</Button>;
  // }

  if (isLoading) {
    content = "در حال پردازش...";
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default AddressList;
