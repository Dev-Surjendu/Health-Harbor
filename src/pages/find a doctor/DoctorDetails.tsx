import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ViewDetails from "../../components/viewDetails/ViewDetails";
import { Box, Rating, Typography, styled, Button } from "@mui/material";

const MainContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
});

const Container = styled(Box)(({ theme }) => ({
  width: "50%",
  [theme.breakpoints.down("lg")]: {
    width: "60%",
  },
  [theme.breakpoints.down("md")]: {
    width: "60%",
  },
  [theme.breakpoints.down("sm")]: {
    width: "70%",
  },
}));

const TopContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  margin: "2rem 0",
  gap: theme.spacing(1),
  [theme.breakpoints.down("lg")]: {
    margin: "1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.8rem 0",
  },
}));

const ImgContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",

  [theme.breakpoints.down("lg")]: {
    margin: "1.5rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0.8rem 0",
  },
}));

const Img = styled("img")(({ theme }) => ({
  height: "200px",
  width: "200px",
  borderRadius: "10px",

  [theme.breakpoints.down("lg")]: {
    height: "180px",
    width: "180px",
  },
  [theme.breakpoints.down("md")]: {
    height: "120px",
    width: "120px",
  },
  [theme.breakpoints.down("sm")]: {
    height: "70px",
    width: "70px",
  },
}));

const NameRatingBox = styled(Box)(({ theme }) => ({
  marginLeft: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginLeft: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    marginLeft: "0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "0.3rem",
  },
}));

const Specialization = styled(Typography)(({ theme }) => ({
  fontSize: "0.8rem",
  padding: "0.5rem 0.8rem",
  maxWidth: "50%",
  borderRadius: "5px",
  backgroundColor: "#d1e2ff",
  textAlign: "center",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.6rem",
    padding: "0.4rem 0.6rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.5rem",
    padding: "0.3rem 0.5rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
    padding: "0rem 0.2rem",
    maxWidth: "70%",
    borderRadius: "3px",
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  fontSize: "1.05rem",
  fontWeight: "bold",

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.5rem",
  },
}));

const ResponsiveRating = styled(Rating)(({ theme }) => ({
  fontSize: "0.9rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.4rem",
  },
}));

const Appointment = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  borderRadius: "7px",
  boxShadow: "1px 5px 8px rgba(0, 0, 0, 0.2)",

  [theme.breakpoints.down("lg")]: {
    padding: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    padding: "0.75rem",
    borderRadius: "5px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "0.45rem",
    borderRadius: "3px",
  },
}));

const TicketPriceContainer = styled(Typography)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "1rem",
  [theme.breakpoints.down("lg")]: {
    marginBottom: "0.75rem",
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: "0.35rem",
  },
  [theme.breakpoints.down("sm")]: { marginBottom: "0.2rem" },
}));

const TimeSoltHeading = styled(Typography)(({ theme }) => ({
  fontSize: "1rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.9rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.6rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.32rem",
  },
}));
const TimeSoltContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: theme.spacing(8),
  [theme.breakpoints.down("lg")]: {
    gap: theme.spacing(6),
  },
  [theme.breakpoints.down("md")]: {
    gap: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    gap: theme.spacing(1),
  },
}));

const Solts = styled(Typography)(({ theme }) => ({
  fontSize: "0.87rem",
  padding: "0.2rem 0 0 0",
  [theme.breakpoints.down("lg")]: {
    fontSize: "0.8rem",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.55rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.28rem",
  },
}));

const BookAppointmentBtn = styled(Button)(({ theme }) => ({
  marginTop: "2rem",
  fontSize: "0.8rem",
  color: "#fff",
  backgroundColor: "#1976d2",
  padding: "0.5rem 0",

  "&:hover": {
    color: "#1976d2",
    backgroundColor: "#fff",
  },

  [theme.breakpoints.down("lg")]: {
    fontSize: "0.7rem",
    marginTop: "1.5rem",
    padding: "0.4rem 0",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "0.4rem",
    marginTop: "1rem",
    padding: "0.2rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "0.2rem",
    marginTop: "0.5rem",
    padding: "0.1rem 0",
  },
}));

const DetailContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  margin: "2.5rem 0 2rem 0",

  [theme.breakpoints.down("lg")]: {
    margin: "2rem 0 1.7rem 0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "1.5rem 0 1.35rem 0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "1rem 0",
  },
}));

const StyleText = styled(Typography)(({ theme, selected }) => ({
  fontSize: "14px",
  position: "relative",
  fontWeight: "bold",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 0,
    bottom: 0,
    height: "1px",
    width: "100%",
    transition: "all ease 0.3s",
    backgroundColor: selected ? "#000" : "#dadadab5",
  },

  "&:hover::after": {
    backgroundColor: "#000",
  },
  [theme.breakpoints.down("lg")]: {
    fontSize: "12px",
  },
  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "7px",
  },
}));

function DoctorDetails() {
  const { state } = useLocation();
  const [showDetails, setShowDetails] = useState(true);
  const [value, setValue] = React.useState<number | null>(2);
  const navigate = useNavigate();

  const handleAboutClick = () => {
    setShowDetails(true);
  };

  const handleFeedbackClick = () => {
    setShowDetails(false);
  };

  let timeSoltsArray;
  if (state.doctor && typeof state.doctor.timeSlot === "string") {
    try {
      timeSoltsArray = JSON.parse(state.doctor.timeSlot);
    } catch (error) {
      console.error("Error parsing timeSolt", error);
      timeSoltsArray = [];
    }
  } else if (state.doctor && Array.isArray(state.doctor.timeSlot)) {
    timeSoltsArray = state.doctor.timeSlot;
  }

  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "pm" : "am";
    let hour12 = hour % 12;
    if (hour12 === 0) hour12 = 12; // Convert "00" to "12"
    const minuteFormatted = minutes === "00" ? "" : `:${minutes}`; // Omit minutes if ":00"
    return `${hour12}${minuteFormatted} ${ampm}`;
  };

  return (
    <MainContainer>
      <Container>
        <TopContainer>
          <ImgContainer>
            <Img src={state.doctor.img} />

            <NameRatingBox>
              <Specialization>{state.doctor.specialization}</Specialization>
              <Name>{state.doctor.name}</Name>
              <ResponsiveRating name="read-only" value={value} readOnly />
            </NameRatingBox>
          </ImgContainer>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Appointment>
              <TicketPriceContainer>
                <Solts sx={{ padding: "0" }}>Ticket price: </Solts>
                <Solts
                  sx={{
                    padding: "0",
                    fontWeight: "bold",
                    letterSpacing: "0.3px",
                  }}
                >
                  {state.doctor.price}
                </Solts>
              </TicketPriceContainer>

              <TimeSoltHeading>Available TimeSolts: </TimeSoltHeading>

              <TimeSoltContainer>
                <Box>
                  {timeSoltsArray &&
                    timeSoltsArray.map((each) => {
                      return (
                        <Solts>
                          {each.day.charAt(0).toUpperCase() + each.day.slice(1)}
                          :
                        </Solts>
                      );
                    })}
                </Box>
                <Box>
                  {timeSoltsArray &&
                    timeSoltsArray.map((each) => {
                      return (
                        <Solts>
                          {formatTime12Hour(each.startTime)} -{" "}
                          {formatTime12Hour(each.endTime)}
                        </Solts>
                      );
                    })}
                </Box>
              </TimeSoltContainer>

              <BookAppointmentBtn variant="outlined">
                Book Appointment
              </BookAppointmentBtn>
            </Appointment>
          </Box>
        </TopContainer>

        <DetailContainer sx={{ gap: 2 }}>
          <StyleText onClick={handleAboutClick} selected={showDetails}>
            About
          </StyleText>
          <StyleText onClick={handleFeedbackClick} selected={!showDetails}>
            Feedback
          </StyleText>
        </DetailContainer>
        {showDetails ? (
          <ViewDetails fetchedData={state.doctor} />
        ) : (
          <Box>feedback</Box>
        )}
      </Container>
    </MainContainer>
  );
}

export default DoctorDetails;
