export const mockData = {
  rooms: [
    {
      id: "104",
      name: "Suite 104 — \"The Mist\"",
      price: 450,
      status: "AVAILABLE",
      amenities: ["King", "AC", "Free"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6aJeBpQfjr2nXfy57cP3a-szvNctjMI7hAt7nHmqNeaPcnOOW8sE-o_Sgy-feP7RFiKbHf5737RFjytRV9BddN5JDdosuR0PLAmdOpNEz3Uexg3ETAeEYz79_jpMFqs6silgGRq0AGnbCB-OsE325QB3wHqpH4rw-HOE2myNKsiA8DJRs1mz3FRj2--EwN0OI2E5EZmnG2cA4qnHoyGcamYGYFILt6-MQ1kFpSA9W095522L3RQ0tWRq3dw5WkpsTQV0wKf7TNlA"
    },
    {
      id: "302",
      name: "Room 302 — \"Pine Hollow\"",
      price: 320,
      status: "AVAILABLE",
      amenities: ["King", "Patio"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBEuBhNgLOU4_KmuGZkLa3JsTQtHVuoeATRB4A0QdxZ5sKqbojsOgMO6rx-_4sycRlrb-xyMLNgy9hSx7iRkqJcDWfNTgw9wM--wMpW5OlU7LOVoFJaEAMyN664knA8qOec9sHYaxevaNIcPb_ULuCog8DReoEMgLxag7E877IT7n_v5Pn2UOQRIDv2piUnidd9QOBJe7yO69a2EofP-N1ZQGH0ei81lvdGHjj8Y9Tuk3oHfIS5DN9DUV4C75fiyYz0T17kWC9eSVc"
    },
    {
      id: "205",
      name: "Studio 205 — \"Daybreak\"",
      price: 280,
      status: "CLEANING",
      amenities: ["Queen", "Bar"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdcdwk_b282Zcz2gMfbh1i6x04Q9PDZENllUJv9GcyeYgX36cwXFjM_c-50nQYbNY-QbNHKG4CdnJu8h2LiFkclb95q4aKRIOXrlsy8ugJNeMkykW0gu8qCtSiiSvtbHlRC1DX6lwuHxv3uWddhUrzZUz266CrKAFRfF25KdW4xwCMOcq34enqiImu9orNMK5VgoXjXpeVlM0wY7soGqaUCk5r9NVPZ_-Z9VZUpPMsWONzFYeA1t8ucBZov5TSvzgAYieETg83NU"
    },
    {
      id: "PH1",
      name: "Penthouse — \"The Canopy\"",
      price: 1200,
      status: "AVAILABLE",
      amenities: ["Pool", "Premium"],
      imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBVSGWBNUiVxE5-HOGKhw0US9J2qsiRf20ZuEfMXsMBRQvtl07eGwPmQdrw2RgGfUuefYiJE75sgs1SXqIvLhMTOwUDvkcxMSMo0KuyWziFiRDNSUHJ9MllPKQM1L0d3lZssWh2bT0IktWndPlWKoWeZ83DBFd7JP8oIuH9DKE7BRKNLOQ8QfE2ruqGgup9cZDAs9Z9M5EheMSA1H1IRs91Fwaws4Ynx-grn78QiXZFEIEzXfOEC3pFA_NyR0DfPDoMaXXpf4ascg"
    }
  ],
  guestProfiles: {
    "sarah_jenkins": {
      name: "Sarah Jenkins",
      status: "Gold Member",
      memberSince: "2021",
      totalSpent: 12450,
      nightsStayed: 28,
      lastStay: "Oct 12, 2023",
      avatarUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUyNZ1kLeuYvBaWBEQ9H9n4Z5FaclcRsly0YOeYa_j07PxIgel240-vKvYDmDd4H7EtENFCp6RTmlIdvwLUBgmTtM_6Mg74XVnhpMHvtSSI97rg9hFRvHOILmpA2-PBoZV0zj7f53-QOwu8DzQZYNy6tifAEd7KijT0O11BZaT8xWk78uCtoPY4DfHyQaLDWUIz4XTyiTe9cLB7IvrPTfXTfNBDUmiUflotIjrmU88k6YIGGxnRMMHb1ClVbTCO40tdExVAMar1o",
      history: [
        { id: "BK-4920", room: "The Mist", checkIn: "Oct 12, 2023", checkOut: "Oct 15, 2023", status: "Completed", amount: 1350 },
        { id: "BK-3118", room: "Pine Hollow", checkIn: "May 04, 2023", checkOut: "May 08, 2023", status: "Completed", amount: 1280 },
        { id: "BK-8821", room: "The Mist", checkIn: "Dec 20, 2022", checkOut: "Dec 25, 2022", status: "Completed", amount: 2250 },
      ]
    }
  },
  bookings: [
    { id: "BK-9012", guestName: "Michael Chang", roomName: "The Mist", checkIn: "Nov 02", checkOut: "Nov 05", status: "Confirmed", amount: 1350, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD34aJ4jX_0N07G3p1aT6vHQ6yV8Xq5f1sR_H2E4J3m19E6k8t4WwB_q0A_" },
    { id: "BK-9013", guestName: "Sarah Jenkins", roomName: "Pine Hollow", checkIn: "Nov 03", checkOut: "Nov 08", status: "Confirmed", amount: 1600, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAqUyNZ1kLeuYvBaWBEQ9H9n4Z5FaclcRsly0YOeYa_j07PxIgel240-vKvYDmDd4H7EtENFCp6RTmlIdvwLUBgmTtM_6Mg74XVnhpMHvtSSI97rg9hFRvHOILmpA2-PBoZV0zj7f53-QOwu8DzQZYNy6tifAEd7KijT0O11BZaT8xWk78uCtoPY4DfHyQaLDWUIz4XTyiTe9cLB7IvrPTfXTfNBDUmiUflotIjrmU88k6YIGGxnRMMHb1ClVbTCO40tdExVAMar1o" },
    { id: "BK-9015", guestName: "Emma Woodhouse", roomName: "The Canopy", checkIn: "Nov 10", checkOut: "Nov 15", status: "Pending", amount: 6000, avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD34aJ4jX_0N07G3p1aT6vHQ6yV8Xq5f1sR_H2E4J3m19E6k8t4WwB_q0B_" },
  ],
  metrics: {
    occupancy: 85,
    occupancyTrend: 4.2,
    arrivals: 12,
    revenue: 14280,
    rating: 4.9,
    reviews: 1240
  }
};
