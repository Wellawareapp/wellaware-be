
const z = require('zod');  

const ProductSchema = z.object({
  // Unique identifier
  id: z.string().optional(),
  barcode:z.string().optional(),
  description:z.string().optional(),
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand name is required"),
  ingredients: z.array(z.string()).optional(),
  certifications: z.array(z.string()).optional(),
  imageUrl: z.string().optional(),

  metadata: z.object({
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
    dataSource: z.enum(["manufacturer", "admin-submission", "user-submission"]).default("admin-submission")
  }).optional()
});


// Validation Function
function validateProduct(data) {
  return ProductSchema.parse(data);
}

module.exports = { validateProduct };  

