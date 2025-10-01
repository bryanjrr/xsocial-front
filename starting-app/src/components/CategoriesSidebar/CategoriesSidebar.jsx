import React from "react";
import Chip from "@mui/material/Chip";

function CategoriesSidebar({ filters, onFilterChange }) {
  return (
    <div className="categories-sidebar">
      <h3>Filtros</h3>
      {filters.map((filter, index) => (
        <div key={index} className="filter-section">
          <h4>{filter.title}</h4>
          <div className="filter-options">
            <Chip
              label={`Todas las ${filter.title.toLowerCase()}`}
              clickable
              color="primary"
              onClick={() => onFilterChange(filter.options[0].type, "")}
              className="filter-chip"
            />
            {filter.options.map((option) => (
              <Chip
                key={option.id}
                label={option.label}
                clickable
                color="default"
                onClick={() => onFilterChange(option.type, option.id)}
                className="filter-chip"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default CategoriesSidebar;