import { Category } from "../Category.entity";

export class CategoryGetResponseDTO {
    status: Boolean;
    message: String;
    data: Category[];
}