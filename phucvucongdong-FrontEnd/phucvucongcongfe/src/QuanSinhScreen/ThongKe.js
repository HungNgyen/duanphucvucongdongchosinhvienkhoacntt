












import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Chart from "chart.js/auto";
import axios from "axios";

const ThongKe = () => {
  const [activityStats, setActivityStats] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedStats, setSelectedStats] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYear, setSelectedYear] = useState(""); // State để lưu năm học được chọn
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  // Lấy danh sách năm học duy nhất từ activityStats
  const uniqueYears = [...new Set(activityStats.map((stat) => stat.nam_hoc))];

  // Lọc dữ liệu theo năm học được chọn
  const displayedStats = selectedYear
    ? activityStats.filter((stat) => stat.nam_hoc === selectedYear)
    : activityStats;

  // Lọc thêm theo searchQuery (giữ nguyên logic tìm kiếm)
  const filteredStats = displayedStats.filter((stat) =>
    `${stat.nam_hoc}, HK${stat.hoc_ky}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchActivityStats();
  }, []);

  useEffect(() => {
    if (displayedStats.length > 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current?.getContext("2d");
      if (ctx) {
        const labels = displayedStats.map((item) => `${item.nam_hoc}, HK${item.hoc_ky}`);
        const soLuongHoatDong = displayedStats.map((item) => item.so_luong_hoat_dong || 0);
        const soNguoiThamGia = displayedStats.map((item) => item.so_luong_nguoi_tham_gia || 0);
        const soNguoiNopMinhChung = displayedStats.map((item) => item.so_luong_nguoi_nop_minh_chung || 0);

        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels,
            datasets: [
              {
                label: "Số lượng hoạt động",
                data: soLuongHoatDong,
                backgroundColor: "rgba(54, 162, 235, 0.8)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
              },
              {
                label: "Số người tham gia",
                data: soNguoiThamGia,
                backgroundColor: "rgba(255, 99, 132, 0.8)",
                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1,
              },
              {
                label: "Số người nộp minh chứng",
                data: soNguoiNopMinhChung,
                backgroundColor: "rgba(75, 192, 192, 0.8)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số lượng",
                },
              },
              x: {
                title: {
                  display: true,
                  text: "Năm học và Học kỳ",
                },
              },
            },
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Thống kê hoạt động tham gia",
              },
            },
            maintainAspectRatio: false,
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [displayedStats]); // Dùng displayedStats thay vì activityStats

  const fetchActivityStats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5093/api/HoatDong/thongkehoatdong"
      );
      console.log("Dữ liệu từ API:", response.data);
      setActivityStats(response.data);
    } catch (error) {
      console.error("Lỗi khi tải thống kê hoạt động:", error);
    }
  };

  const handleDetailOpen = (stat) => {
    setSelectedStats(stat);
    setOpenDetail(true);
  };

  const handleDetailClose = () => {
    setOpenDetail(false);
    setSelectedStats(null);
  };

  return (
    <Box sx={{ padding: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Thống Kê Hoạt Động
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <FormControl sx={{ minWidth: 200 }} size="small">
            <InputLabel id="year-select-label">Chọn năm học</InputLabel>
            <Select
              labelId="year-select-label"
              value={selectedYear}
              label="Chọn năm học"
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <MenuItem value="">Tất cả</MenuItem>
              {uniqueYears.map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Tìm kiếm theo năm học và học kỳ"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ width: 300 }}
          />
        </Box>
      </Box>
      <Paper sx={{ width: "100%", overflow: "hidden", mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Năm Học</TableCell>
              <TableCell>Học Kỳ</TableCell>
              <TableCell>Số Lượng Hoạt Động</TableCell>
              <TableCell>Số Người Tham Gia</TableCell>
              <TableCell>Số Người Nộp Minh Chứng</TableCell>
              <TableCell>Thao Tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStats.map((stat) => (
              <TableRow
                key={`${stat.nam_hoc}-${stat.hoc_ky}`}
                hover
                onClick={() => handleDetailOpen(stat)}
                sx={{ cursor: "pointer" }}
              >
                <TableCell>{stat.nam_hoc}</TableCell>
                <TableCell>HK{stat.hoc_ky}</TableCell>
                <TableCell>{stat.so_luong_hoat_dong}</TableCell>
                <TableCell>{stat.so_luong_nguoi_tham_gia}</TableCell>
                <TableCell>{stat.so_luong_nguoi_nop_minh_chung}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Button
                    color="primary"
                    onClick={() => handleDetailOpen(stat)}
                  >
                    Xem Chi Tiết
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Biểu Đồ Thống Kê
        </Typography>
        <Paper sx={{ p: 2 }}>
          <Box sx={{ height: "400px", width: "100%" }}>
            {displayedStats.length > 0 ? (
              <canvas ref={chartRef}></canvas>
            ) : (
              <Typography>Không có dữ liệu để hiển thị biểu đồ.</Typography>
            )}
          </Box>
        </Paper>
      </Box>

      <Dialog open={openDetail} onClose={handleDetailClose}>
        <DialogTitle sx={{ backgroundColor: "#1976d2", color: "white", padding: "16px 24px" }}>
          Chi Tiết Thống Kê
        </DialogTitle>
        <DialogContent>
          {selectedStats && (
            <>
              <Typography variant="subtitle1">
                <strong>Năm Học:</strong> {selectedStats.nam_hoc}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Học Kỳ:</strong> HK{selectedStats.hoc_ky}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Số Lượng Hoạt Động:</strong> {selectedStats.so_luong_hoat_dong}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Số Người Tham Gia:</strong> {selectedStats.so_luong_nguoi_tham_gia}
              </Typography>
              <Typography variant="subtitle1">
                <strong>Số Người Nộp Minh Chứng:</strong> {selectedStats.so_luong_nguoi_nop_minh_chung}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDetailClose} color="primary">
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ThongKe;