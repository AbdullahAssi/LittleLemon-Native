import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("little_lemon");

const selectAllMenu = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      try {
        tx.executeSql(
          `
              CREATE TABLE IF NOT EXISTS menu (
                  id INTEGER PRIMARY KEY AUTOINCREMENT,
                  name TEXT NOT NULL,
                  price NUMERIC NOT NULL,
                  description TEXT NOT NULL,
                  image TEXT NOT NULL,
                  category TEXT NOT NULL
                  );
                  `
        );

        tx.executeSql("select * from menu", [], (_, { rows }) => {
          const menu = rows._array;
          resolve(menu);
        });
      } catch (error) {
        console.error("ERROR GETTING MENU", error);
        reject(error);
      }
    });
  });
};

const getDataFromApiAsync = async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json"
    );
    const json = await response.json();
    return json.menu;
  } catch (error) {
    console.error(error);
  }
};

const insertDish = (dishName, description, price, photoUri, category) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "insert into menu (name,price,description,image,category) values (?,?,?,?,?)",
          [dishName, price, description, photoUri, category]
        );
      },
      reject,
      resolve
    );
  });
};

const resetDatabase = () => {
  return new Promise((resolve, reject) => {
    try {
      db.transaction(
        (tx) => {
          tx.executeSql("DROP TABLE IF EXISTS menu");
        },
        reject,
        resolve
      );
    } catch (error) {
      console.error("Error Reseting database", error);
      reject(error);
    }
  });
};

const checkMenuTableAndPopulateData = async () => {
  const dbMenu = await selectAllMenu();
  if (dbMenu?.length) return dbMenu;
  const menuItemsFromApi = await getDataFromApiAsync();

  const formattedItemsFromApi = menuItemsFromApi.map((item) => ({
    ...item,
    image: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${item.image}?raw=true`,
  }));
  for (const item of formattedItemsFromApi) {
    await insertDish(
      item.name,
      item.description,
      item.price,
      item.image,
      item.category
    );
  }
  const menuItems = await selectAllMenu();
  return menuItems;
};

const filterMenuItems = (categories, searchInput) => {
  return new Promise((resolve, reject) => {
    try {
      const queryArray = [];
      if (searchInput.length) {
        queryArray.push(`LOWER(name) LIKE '%${searchInput.toLowerCase()}%'`);
      }
      if (categories.length) {
        for (const catagory of categories) {
          queryArray.push(`category='${catagory.toLowerCase()}'`);
        }
      }
      const queryString = queryArray.length
        ? "where " + queryArray.join(" AND ")
        : "";
      const finalQuery = `select * from menu ${queryString};`;
      db.transaction(
        (tx) => {
          tx.executeSql(finalQuery, [], (_, { rows }) => {
            const menu = rows._array;
            resolve(menu);
          });
        },
        (e) => console.error("ERROR FILTERING", e)
      );
    } catch (error) {
      console.error("Error filtering menu items", error);
      reject(error);
    }
  });
};

export {
  filterMenuItems,
  selectAllMenu,
  insertDish,
  checkMenuTableAndPopulateData,
  getDataFromApiAsync,
  resetDatabase,
};
