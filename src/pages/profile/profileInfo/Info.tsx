import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { ButtonProps } from "@mui/material/Button";
import Qualification from "../../../components/qualification/Qualification";
import Experiences from "../../../components/Experiences/Experiences";
import TimeSlot from "../../../components/timesolt/TimeSlot";
import InsertData from "../../../supabase/InsertData";
import { User } from "@supabase/supabase-js";
import { Edit, Check } from "@mui/icons-material";
import UpdateData from "../../../supabase/UpdateData";
import CircularProgress from "@mui/material/CircularProgress";
import LocationFields from "../../../components/locationFields/LocationFields";

const MainContainer = styled(Box)(({ theme }) => ({
  width: "50%",
  margin: "2rem 0",
  [theme.breakpoints.down("lg")]: {
    margin: "0",
  },
  [theme.breakpoints.down("md")]: {
    margin: "0",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0",
  },
}));

const ProfileTitleContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const EditBtn = styled(Button)(({ theme }) => ({
  color: "#1D2B53",
  background: "#80808014",
  borderRadius: "10px",
  transition: "transform 0.3s ease",
  ":hover": {
    transform: "scale(1.15)",
  },
  "& .MuiButton-startIcon": {
    transition: "transform 0.3s ease",
    ":hover": {
      transform: "scale(1.2)",
    },
  },
  [theme.breakpoints.down("lg")]: {
    minWidth: "48px",
    height: "28px",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "30px",
    height: "20px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "12px",
    height: "12px",
  },
}));

const ProfileTitle = styled("h1")(({ theme }) => ({
  margin: 0,
  padding: 0,
  fontSize: "1.5rem",
  [theme.breakpoints.down("lg")]: { fontSize: "1.15rem" },
  [theme.breakpoints.down("md")]: { fontSize: "0.9rem" },
  [theme.breakpoints.down("sm")]: { fontSize: "0.7rem" },
}));

const TitleTextField = styled(TextField)(({ theme }) => ({
  marginTop: "1.5rem",
  display: "block",
  backgroundColor: "#fff",

  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
  },

  "& .MuiInputBase-root": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.95rem",
      padding: "0px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
  "& .MuiOutlinedInput-input": {
    [theme.breakpoints.down("lg")]: {
      height: "20px",
    },
    [theme.breakpoints.down("md")]: {
      height: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      height: "0px",
      padding: "15px",
    },
  },
}));
const PriceTextField = styled(TitleTextField)(({ theme }) => ({
  marginTop: "0rem",

  [theme.breakpoints.down("lg")]: {
    marginTop: "0rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0rem",
  },
}));

const ResponsiveSelect = styled(Select)(({ theme }) => ({
  "& .MuiSelect-select": {
    [theme.breakpoints.down("lg")]: {
      fontSize: "0.95rem",
      padding: "15px",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.85rem",
      padding: "10px",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
      padding: "3px",
    },
  },
}));

const SelectOption = styled(Box)(({ theme }) => ({
  display: "flex",
  marginTop: "1.5rem",
  gap: 10,
  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
  },
  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.7rem",
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  fontSize: "1rem",
  boxShadow: "1px 4px 8px rgba(0, 0, 0, 0.3)",
  marginTop: "1.5rem",

  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: "#6a79ff",
  "&:hover": {
    backgroundColor: "#5162ff",
  },
  [theme.breakpoints.down("lg")]: {
    marginTop: "1rem",
    fontSize: "0.7rem",
    padding: "8px 15px",
  },

  [theme.breakpoints.down("md")]: {
    marginTop: "0.9rem",
    fontSize: "0.6rem",
    padding: "6px 15px",
  },
  [theme.breakpoints.down("sm")]: {
    marginTop: "0.8rem",
    fontSize: "0.5rem",
    padding: "4px 10px",
  },
}));

interface IQualification {
  startDate?: string;
  endDate?: string;
  degree?: string;
  university?: string;
}
interface IExperience {
  startDate?: string;
  endDate?: string;
  position?: string;
  hospital?: string;
}
type DoctorInfo = {
  id: number;
  name: string;
  email: string;
  phoneno: string;
  bio: string;
  gender: string;
  specialization: string;
  price: number;
  address: string;
  city: string;
  qualifications: string[];
  experiences: string[];
  timeSlot: string[];
  about: string;
};

function Info({
  user,
  fetchedData,
}: {
  user: User | null;
  fetchedData: DoctorInfo | null;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [bio, setBio] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [qualifications, setQualifications] = useState<IQualification[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [about, setAbout] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEditMode, setIsEditMode] = useState(!fetchedData);
  const [changes, setChanges] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkFormValidity();
  }, [phone, qualifications, experiences, timeSlots]);

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const isValidPhone = /^\d{10}$/.test(value);
    setPhoneError(isValidPhone ? "" : "Phone number must be 10 digits");
    setPhone(value);
  };

  const checkFormValidity = () => {
    const isValid =
      phoneError === "" &&
      phone.length === 10 &&
      qualifications.length > 0 &&
      experiences.length > 0 &&
      timeSlots !== null;
    setIsFormValid(isValid);
  };

  const insertData = async () => {
    const newDoctor = {
      name: name,
      email: user?.email,
      phoneno: phone,
      bio: bio,
      gender: gender,
      specialization: specialization,
      price: parseInt(price, 10),
      address: address,
      city: city,
      qualifications: JSON.stringify(qualifications),
      experiences: JSON.stringify(experiences),
      timeSlot: JSON.stringify(timeSlots),
      about: about,
    };
    console.log(newDoctor);
    await InsertData(newDoctor);
    setIsLoading(false);
  };

  const updateData = async () => {
    await UpdateData(user?.email, changes);
    setChanges({});
    setIsLoading(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    if (isEditMode) {
      await updateData();
    } else {
      await insertData();
    }
    setIsEditMode(false);
  };

  // use to open Qualification
  const handleAddQualification = () => {
    setQualifications([...qualifications, {}]);
  };

  const handleQualificationChange = (
    index: number,
    qualificationData: IQualification
  ) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = qualificationData;
    setQualifications(newQualifications);
  };

  // use to open Experience
  const handleAddExperience = () => {
    setExperiences([...experiences, {}]);
  };

  const handleExperienceChange = (
    index: number,
    experienceData: IExperience
  ) => {
    const newExperiences = [...experiences];
    newExperiences[index] = experienceData;
    setExperiences(newExperiences);
  };

  // handle qualifications,experiences,timeSlot

  useEffect(() => {
    if (fetchedData) {
      if (fetchedData.qualifications) {
        setQualifications(JSON.parse(fetchedData.qualifications));
      }
      if (fetchedData.experiences) {
        setExperiences(JSON.parse(fetchedData.experiences));
      }
      if (fetchedData.timeSlot) {
        const parsedTimeSlots = JSON.parse(fetchedData.timeSlot);
        setTimeSlots(parsedTimeSlots);
      }
    }
  }, [fetchedData]);

  const handleAddTimeSlot = () => {
    setTimeSlots([...timeSlots, { day: "", startTime: null, endTime: null }]);
  };

  const handleTimeSlotChange = (index, updatedSlot) => {
    const newTimeSlots = [...timeSlots];
    newTimeSlots[index] = updatedSlot;
    setTimeSlots(newTimeSlots);
  };

  useEffect(() => {
    if (fetchedData) {
      setName(fetchedData.name);
      setPhone(fetchedData.phoneno);
      setBio(fetchedData.bio);
      setPrice(fetchedData.price);
      setAddress(fetchedData.address);
      setCity(fetchedData.city);
      setSpecialization(fetchedData.specialization);
      setGender(fetchedData.gender);
      setQualifications(JSON.parse(fetchedData.qualifications || "[]"));
      setExperiences(JSON.parse(fetchedData.experiences || "[]"));
      setTimeSlots(JSON.parse(fetchedData.timeSlot || "[]"));
      setAbout(fetchedData.about);
    }
  }, [fetchedData]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
    // if (isEditMode) {
    //   // Here, you can implement the logic to handle the submission of edited details
    //   // For example, you could call an update function to save the edited details to the database
    // }
  };

  return (
    <MainContainer>
      <ProfileTitleContainer>
        <ProfileTitle>Profile Information</ProfileTitle>
        {fetchedData && (
          <EditBtn onClick={toggleEditMode}>
            {isEditMode ? <Check /> : <Edit />}
          </EditBtn>
        )}
      </ProfileTitleContainer>

      <form onSubmit={handleSubmit}>
        <TitleTextField
          required
          value={name}
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
          fullWidth
          // disabled={!!fetchedData}
          disabled={!isEditMode}
        />
        {user && (
          <TitleTextField
            id="email"
            label="Email*"
            defaultValue={user.email}
            InputProps={{
              readOnly: true,
            }}
            disabled
            fullWidth
          />
        )}
        <TitleTextField
          required
          value={phone}
          id="phone"
          label="Phone"
          onChange={handlePhoneChange}
          fullWidth
          // disabled={!!fetchedData}
          disabled={!isEditMode}
        />
        {phoneError && (
          <Typography variant="inherit" sx={{ color: "red" }}>
            {phoneError}
          </Typography>
        )}
        <TitleTextField
          required
          value={bio}
          id="bio"
          label="Bio"
          onChange={(e) => setBio(e.target.value)}
          fullWidth
          // disabled={!!fetchedData}
          disabled={!isEditMode}
        />

        <SelectOption>
          <FormControl
            fullWidth
            // disabled={!!fetchedData}
            disabled={!isEditMode}
          >
            <InputLabel id="demo-simple-select-label">Gender*</InputLabel>
            <ResponsiveSelect
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={gender}
              label="gender"
              onChange={(e) => setGender(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
            >
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </ResponsiveSelect>
          </FormControl>

          <FormControl
            fullWidth
            // disabled={!!fetchedData}
            disabled={!isEditMode}
          >
            <InputLabel id="demo-simple-select-label">
              Specialization*
            </InputLabel>
            <ResponsiveSelect
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={specialization}
              label="specialization"
              onChange={(e) => setSpecialization(e.target.value)}
              sx={{ backgroundColor: "#fff" }}
              // disabled={!!fetchedData}
            >
              <MenuItem value="cardiology">Cardiology</MenuItem>
              <MenuItem value="dentist">Dentist</MenuItem>
              <MenuItem value="specialized">Specialized</MenuItem>
              <MenuItem value="urology">Urology</MenuItem>
              <MenuItem value="neurology">Neurology</MenuItem>
              <MenuItem value="orthopedic">Orthopedic</MenuItem>
              <MenuItem value="stomach">Stomach</MenuItem>
            </ResponsiveSelect>
          </FormControl>

          <PriceTextField
            required
            value={price}
            id="price"
            label="Ticket Price"
            fullWidth
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginTop: 0 }}
            // disabled={!!fetchedData}
            disabled={!isEditMode}
          />
        </SelectOption>

        <LocationFields
          isEditMode={isEditMode}
          setAddress={setAddress}
          setCity={setCity}
          address={address}
          city={city}
        />

        {/* Qualification Section */}
        <Box>
          <ColorButton onClick={handleAddQualification} variant="contained">
            Add Qualification
          </ColorButton>
          {qualifications.map((qualification, index) => (
            <Qualification
              key={index}
              qualification={qualification}
              onQualificationChange={(qualificationData) =>
                handleQualificationChange(index, qualificationData)
              }
              fetchedData={fetchedData}
            />
          ))}
        </Box>

        {/* Experience Section */}
        <Box>
          <ColorButton onClick={handleAddExperience} variant="contained">
            Add Experience
          </ColorButton>
          {experiences.map((experience, index) => (
            <Experiences
              key={index}
              experience={experience}
              onExperienceChange={(updatedExperience) =>
                handleExperienceChange(index, updatedExperience)
              }
              fetchedData={fetchedData} // Explicitly passing null if no fetchedData
            />
          ))}
        </Box>

        {/* TimeSlot Section */}
        <Box>
          <ColorButton onClick={handleAddTimeSlot} variant="contained">
            Add TimeSlot
          </ColorButton>
          {timeSlots.map((slot, index) => (
            <TimeSlot
              key={index} // Here, ensure you have a proper key. Index as a key is not recommended for dynamic lists.
              slot={slot}
              onTimeSlotChange={(updatedSlot) =>
                handleTimeSlotChange(index, updatedSlot)
              }
            />
          ))}
        </Box>

        <Typography sx={{ fontSize: "1rem", marginTop: "1.5rem" }}>
          About
        </Typography>
        <PriceTextField
          fullWidth
          onChange={(e) => setAbout(e.target.value)}
          sx={{ backgroundColor: "#fff" }}
          value={about}
          // disabled={!!fetchedData}
          disabled={!isEditMode}
        ></PriceTextField>

        <ColorButton
          type="submit"
          variant="contained"
          color="primary"
          // disabled={isEditMode || !isFormValid || isLoading}
          // disabled={!isEditMode || !isFormValid}
        >
          Submit
        </ColorButton>
        {isLoading && <CircularProgress />}
      </form>
    </MainContainer>
  );
}

export default Info;
