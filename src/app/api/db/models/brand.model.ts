import { Schema, model, models } from 'mongoose';

export  enum Status{
    Active = 'active',
    InActvie = 'inActive'
}
const BrandSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: Status,
      default: Status.Active,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Brand = models.Brand || model('Brand', BrandSchema);

export default Brand;
