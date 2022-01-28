import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../contexts/AdminProvider";

const Edit = () => {
  const params = useParams();
  const { getProductToEdit, productToEdit, saveEditedProduct } =
    useContext(AdminContext);
  const [productEdit, setProductEdit] = React.useState(productToEdit);
  const navigate = useNavigate();

  useEffect(() => {
    setProductEdit(productToEdit);
  }, [productToEdit]);

  useEffect(() => {
    getProductToEdit(params.id);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    // ! Проверка на пустоту
    for (const key in productEdit) {
      if (!productEdit[key]) {
        alert("Заполните поля!!!");
        return;
      }
    }
    saveEditedProduct(productEdit);
    navigate("/admin-panel");
  };

  if (!productEdit) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="add-edit-page">
      <Container>
        <h2>Edit page</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            value={productEdit.name}
            onChange={(e) =>
              setProductEdit({ ...productEdit, name: e.target.value })
            }
            label="Введите название"
            variant="standard"
          />
          <TextField
            value={productEdit.brand}
            onChange={(e) =>
              setProductEdit({ ...productEdit, brand: e.target.value })
            }
            label="Введите бренд"
            variant="standard"
          />
          <TextField
            value={productEdit.price}
            onChange={(e) =>
              setProductEdit({ ...productEdit, price: e.target.value })
            }
            label="Введите цену"
            variant="standard"
            type="number"
          />
          <TextareaAutosize
            value={productEdit.description}
            onChange={(e) =>
              setProductEdit({ ...productEdit, description: e.target.value })
            }
            placeholder="Введите описание"
            minRows={3}
          />
          <TextField
            value={productEdit.image}
            onChange={(e) =>
              setProductEdit({ ...productEdit, image: e.target.value })
            }
            label="Введите фото"
            variant="standard"
          />
          <FormControl fullWidth>
            <InputLabel id="color-select">Цвет</InputLabel>
            <Select
              value={productEdit.color}
              onChange={(e) =>
                setProductEdit({ ...productEdit, color: e.target.value })
              }
              labelId="color-select"
              label="Выберите цвет"
            >
              <MenuItem value="black">Чёрный</MenuItem>
              <MenuItem value="white">Белый</MenuItem>
              <MenuItem value="gray">Серый</MenuItem>
              <MenuItem value="space-gray">Темно-серый</MenuItem>
            </Select>
          </FormControl>
          <Button color="success" variant="contained" type="submit">
            Сохранить изменения
          </Button>
        </form>
      </Container>
    </div>
  );
};

export default Edit;
