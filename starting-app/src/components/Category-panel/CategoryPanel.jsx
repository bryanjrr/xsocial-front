import React from "react";
import Chip from "@mui/material/Chip";
import "./CategoryPanel.css";

function CategoryPanel({ categories, onCategorySelect }) {
    return (
        <div className="category-panel">
            <h3>Explora por Categorías</h3>
            <div className="category-options">
                <Chip
                    label="Todas las Categorías"
                    clickable
                    color="primary"
                    onClick={() => onCategorySelect("category", "")}
                    className="category-chip"
                />
                {categories.map((cat) => (
                    <Chip
                        key={cat.id}
                        label={cat.name}
                        clickable
                        color="default"
                        onClick={() => onCategorySelect("category", cat.id)}
                        className="category-chip"
                    />
                ))}
            </div>
        </div>
    );
}

export default CategoryPanel;