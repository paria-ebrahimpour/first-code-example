import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function BreadCrumbs(props) {
//   const history = useHistory();

  function handleClick(event) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
    // history.push("");
  }
  const breadcrumbs = [
    <Link
      underline="hover"
      key="1"
      color="inherit"
      href="/"
    //   onClick={handleClick}
    >
      خانه
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/${props.cat}"
      onClick={handleClick}
    >
      {props.cat}
    </Link>,
    <Typography noWrap="false" key="3" color="text.primary">
      {props.name}
    </Typography>,
  ];

  return (
    <Stack spacing={1} sx={{marginBottom: 2, marginRight: 1}}>
      <Breadcrumbs
        separator={<NavigateBeforeIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
