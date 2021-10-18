import AddressItem from "./AddressItem";
import { useEffect, useState } from "react";
import { Card } from "@mui/material/";
import LoadingSpinner from "../../components/UI/LoadingSpinner";
import { getAllAddresses } from "../../lib/api";
import useHttp from "./../../hooks/use-http";
import { IconButton } from '@mui/material/';
import DeleteIcon from "@mui/icons-material/Delete";

const AddressList = (props) => {
  const [addresses, setAddresses] = useState([]);

  // const params = useParams();

  // const { mealId } = params;

    const deleteAddressHandler = () => {
      console.log("deleted");
    };

  const {
    sendRequest,
    status,
    error,
    data: loadedAddresses,
  } = useHttp(getAllAddresses);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // useEffect(() => {
  //   sendRequest(mealId);
  // }, [mealId, sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedAddresses) {
    return <p>آدرسی یافت نشد</p>;
  }

  let addressList = <h4>آدرسی وجود ندارد. لطفا آدرس خود را وارد کنید</h4>;

  if (loadedAddresses.length > 0) {
    addressList = (
      <ul style={{ listStyleType: "none", width: 570 }}>
        {loadedAddresses.map((address) => (
          <AddressItem
            key={address.id}
            id={address.id}
            city={address.city}
            address={address.address}
            postalCode={address.postslCode}
          >
            <span>
              {address.city} - {address.address}
              <IconButton
                sx={{ float: "left" }}
                aria-label="delete"
                color="error"
                variant="contained"
                onClick={deleteAddressHandler}
              >
                <DeleteIcon />
              </IconButton>
            </span>
          </AddressItem>
        ))}
      </ul>
    );
  }

  let content = addressList;

  return (
    <Card
      sx={{
        maxWidth: 650,
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
        margin: "auto",
        marginBottom: 8,
      }}
    >
      {content}
    </Card>
  );
};

export default AddressList;
