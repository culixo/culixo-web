import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Collapse,
  Grid2 as Grid,
  Typography,
  useMediaQuery,
  useTheme,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const categories = [
  {
    name: "Explore Categories",
    subcategories: [
      "All Categories",
      "New Arrivals",
      "Best Sellers",
      "Seasonal Specials",
      "Trending Now",
    ],
  },
  {
    name: "Cuisine Types",
    subcategories: [
      "Italian",
      "Mexican",
      "Chinese",
      "Indian",
      "Japanese",
      "French",
      "Thai",
      "Mediterranean",
    ],
  },
  {
    name: "Meal Types",
    subcategories: [
      "Breakfast",
      "Lunch",
      "Dinner",
      "Appetizers",
      "Desserts",
      "Snacks",
      "Beverages",
    ],
  },
  {
    name: "Dietary",
    subcategories: [
      "Vegetarian",
      "Vegan",
      "Gluten-Free",
      "Keto",
      "Paleo",
      "Low-Carb",
      "Dairy-Free",
      "Nut-Free",
    ],
  },
  {
    name: "Cooking Methods",
    subcategories: [
      "Grilling",
      "Baking",
      "Slow Cooker",
      "Air Fryer",
      "One-Pot",
      "Instant Pot",
      "Sous Vide",
      "Raw",
    ],
  },
];

const CategoriesDropdown = ({ isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();

  const matchesMD = useMediaQuery(theme.breakpoints.down("1050"));

  const renderMenuText = (
    <Typography
      variant='body1'
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontWeight: isActive("/categories") ? 700 : 500,
        transition: "color 0.3s ease",
        color: isActive("/categories")
          ? "common.success40"
          : matchesMD && theme.palette.mode === "light"
          ? "common.dark100"
          : "common.light100",
        "&:hover": {
          color: "common.success60",
        },
      }}
      onClick={() => setIsOpen((o) => !o)}
    >
      Categories
      <KeyboardArrowDownIcon
        style={{
          transition: "transform 0.3s ease",
          transform: isOpen ? "rotate(180deg)" : "none",
        }}
      />
    </Typography>
  );
  return (
    <div>
      {/* <Link href='/categories' style={{ textDecoration: "none" }}> */}

      {/* </Link> */}
      {matchesMD ? (
        <>
          {renderMenuText}

          <Collapse in={isOpen}>
            <Grid container direction='column' sx={{ ml: "10px", mt: "20px" }}>
              {categories.map((category, index) => (
                <Accordion
                  elevation={0}
                  sx={{
                    "&:before": { height: "0px" },
                    background: "transparent",
                    p: 0,
                    m: "0 !important",
                    pb: "15px",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<KeyboardArrowDownIcon />}
                    aria-controls={`panel${index}-content`}
                    id={`panel${index}-header`}
                    sx={{
                      p: 0,
                      m: 0,
                      minHeight: "unset !important",
                      "& .MuiAccordionSummary-content": {
                        m: 0,
                      },
                      "& .MuiAccordionSummary-content.Mui-expanded": {
                        pb: "15px",
                      },
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{
                        color:
                          matchesMD && theme.palette.mode === "light"
                            ? "common.dark100"
                            : "common.light100",

                        fontWeight: 600,
                        "&:hover": {
                          color: "common.success60",
                        },
                      }}
                    >
                      {category.name}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ p: 0, m: 0 }}>
                    <Grid container direction='column' gap='12px'>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <Grid item key={subIndex}>
                          <Link
                            href={`/categories/${category.name.toLowerCase()}/${subcategory
                              .toLowerCase()
                              .replace(/\s+/g, "-")}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Typography
                              variant='body2'
                              sx={{
                                color:
                                  matchesMD && theme.palette.mode === "light"
                                    ? "common.dark60"
                                    : "common.light50",
                                transition: "color 0.3s ease",
                                "&:hover": {
                                  color: "common.success60",
                                },
                              }}
                            >
                              {subcategory}
                            </Typography>
                          </Link>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Collapse>
        </>
      ) : (
        <div
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          {renderMenuText}

          <Box
            sx={{
              position: "fixed",
              top: "60px",
              left: "0",
              right: "0",
              backgroundColor: "rgba(29, 29, 31, 0.95)",
              backdropFilter: "blur(20px)",
              padding: "2rem 0",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              opacity: isOpen ? 1 : 0,
              visibility: isOpen ? "visible" : "hidden",
              transform: isOpen ? "translateY(0)" : "translateY(-10px)",
              transition:
                "opacity 0.3s ease, visibility 0.3s ease, transform 0.3s ease",
              width: "100%",
              minHeight: "50vh",
              overflowY: "auto",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                maxWidth: "1200px",
                margin: "0 auto",
                height: "100%",
              }}
            >
              {categories.map((category, index) => (
                <div
                  key={index}
                  style={{
                    flex: 1,
                    p: "0 16px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant='subtitle1'
                    sx={{
                      color: "common.light100",

                      mb: "16px",
                      fontWeight: 600,
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Grid container direction='column' gap='12px'>
                    {category.subcategories.map((subcategory, subIndex) => (
                      <Grid item key={subIndex}>
                        <Link
                          href={`/categories/${category.name.toLowerCase()}/${subcategory
                            .toLowerCase()
                            .replace(/\s+/g, "-")}`}
                          style={{ textDecoration: "none" }}
                        >
                          <Typography
                            variant='body2'
                            sx={{
                              color: "common.light50",
                              transition: "color 0.3s ease",
                              "&:hover": {
                                color: "common.light100",
                              },
                            }}
                          >
                            {subcategory}
                          </Typography>
                        </Link>
                      </Grid>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>
          </Box>
        </div>
      )}
    </div>
  );
};

export default CategoriesDropdown;
