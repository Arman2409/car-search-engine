export const migrationQuery = `
                CREATE TABLE IF NOT EXISTS cars (
                    id SERIAL PRIMARY KEY,
                    make VARCHAR(50) NOT NULL,
                    model VARCHAR(50) NOT NULL,
                    year INT NOT NULL,
                    body_type VARCHAR(50) NOT NULL
                );
            `;

export const getAllInsertionQuery = (valuesString: string) => `
               INSERT INTO cars (id, make, model, year, body_type) VALUES ${valuesString}
             `;

export const indexesCreationQuery = `
                CREATE INDEX IF NOT EXISTS idx_cars_make ON cars (make);
                CREATE INDEX IF NOT EXISTS idx_cars_model ON cars (model);
                CREATE INDEX IF NOT EXISTS idx_cars_year ON cars (year);
                CREATE INDEX IF NOT EXISTS idx_cars_body_type ON cars (body_type);
                `