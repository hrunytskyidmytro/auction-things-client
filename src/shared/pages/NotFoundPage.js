import React from "react";
import "../styles/NotFoundPageStyle.css";

const NotFoundPage = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Вибачте, сторінка не знайдена!</h2>
          <p>
            Сторінка, яку ви шукаєте, могла бути видалена, якщо її назва або
            вона тимчасово недоступна.
          </p>
          <a href="/">Повернутися на головну</a>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
