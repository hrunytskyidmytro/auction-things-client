import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Link,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQ = () => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: 3, sm: 6 },
      }}
    >
      <Typography
        component="h2"
        variant="h4"
        color="text.primary"
        sx={{
          width: { sm: "100%", md: "60%" },
          textAlign: { sm: "left", md: "center" },
        }}
      >
        Питання, що часто задаються
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1d-content"
            id="panel1d-header"
          >
            <Typography component="h3" variant="subtitle1">
              Як я можу зв'язатися з обслуговуючою службою, якщо у мене виникли
              питання чи проблеми?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "100%" } }}
            >
              Ви можете звернутися до нашої служби підтримки, надіславши
              електронного листа на адресу <Link> support@email.com </Link>
              або зателефонувавши на наш безкоштовний номер. Ми тут, щоб
              оперативно вам допомогти.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2d-content"
            id="panel2d-header"
          >
            <Typography component="h3" variant="subtitle1">
              Чи можу я повернути товар, якщо він не відповідає моїм
              очікуванням?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "100%" } }}
            >
              Звичайно! Ми пропонуємо безпроблемну політику повернення. Якщо ви
              не повністю задоволені, ви можете повернути товар протягом
              [кількість днів] днів і отримати повний повернення коштів або
              обмін.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4d-content"
            id="panel4d-header"
          >
            <Typography component="h3" variant="subtitle1">
              Як можу почати участь у аукціоні речей?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "100%" } }}
            >
              Для того, щоб взяти участь у наших аукціонах, вам потрібно
              зареєструватися на нашому сайті і стежити за актуальними лотами.
              Після реєстрації ви зможете придбати бажаний товар шляхом участі в
              аукціоні. Більше Ви можете дізнатися на сторінці "Продати на
              Bid&Win".
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel5d-content"
            id="panel5d-header"
          >
            <Typography component="h3" variant="subtitle1">
              Які способи оплати доступні під час аукціону?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              variant="body2"
              gutterBottom
              sx={{ maxWidth: { sm: "100%", md: "100%" } }}
            >
              Ми приймаємо різноманітні способи оплати, такі як кредитні та
              дебетові картки, електронні гаманці та інші електронні платежі.
              Після успішного завершення аукціону ви зможете обрати найзручніший
              спосіб оплати.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Container>
  );
};

export default FAQ;
