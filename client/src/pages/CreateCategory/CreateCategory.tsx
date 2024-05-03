import React, { useState } from 'react';
import BackendApi from '../../services/BackendApi';

function CreateCategory() {
  const backendApi = new BackendApi();
  const [categoryName, setCategoryName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const createdCategory = await backendApi.createCategory({ name: categoryName });
      console.log('Catégorie créée avec succès :', createdCategory);
    } catch (error) {
      console.error('Erreur lors de la création de la catégorie :', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  return (
    <div>
      <h1>Créer une catégorie</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nom de la catégorie:
          <input type="text" value={categoryName} onChange={handleChange} />
        </label>
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}

export default CreateCategory;
