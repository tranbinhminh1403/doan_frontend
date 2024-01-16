import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
const CurrentRoom = () => {
  const [currentRoomData, setCurrentRoomData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/fakedataCurrentRoom.json"); // Adjust the path as needed
        const data = await response.json();
        setCurrentRoomData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {currentRoomData[0] && (
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: 5,
              paddingBottom: 5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flex: "row",
                border: 1,
                borderColor: "grey.500",
                borderRadius: 3,
                padding: 1,
              }}
            >
              <Typography sx={{ fontWeight: 700 }}>Phòng</Typography>
              <Typography sx={{ fontWeight: 700, paddingLeft: 1 }}>
                {currentRoomData[0].building} - {currentRoomData[0].room}
              </Typography>
            </Box>
            <Box>
              <TextField
                variant="standard"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{paddingRight: 2}}
              />
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Họ và tên</TableCell>
                  <TableCell>Ngày sinh</TableCell>
                  <TableCell>Giới tính</TableCell>
                  <TableCell>Lớp</TableCell>
                  <TableCell>Mã số sinh viên</TableCell>
                  <TableCell>Ghi chú</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRoomData.map((roomInfo) =>
                  roomInfo.student.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.id}</TableCell>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.date_of_birth}</TableCell>
                      <TableCell>{student.gender}</TableCell>
                      <TableCell>{student.class}</TableCell>
                      <TableCell>{student.mssv}</TableCell>
                      <TableCell>{student.note}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </div>
  );
};

export default CurrentRoom;
