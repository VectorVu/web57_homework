## Danh sách sản phẩm có giá bán từ 50000 đến 100000
```
const products = await ProductModel.find({price:{$gte:50000, $lte: 100000}})
```
## Danh sách sản phẩm có title hoặc description chứa từ khoá "áo" (không phân biệt hoa thường)
```
const products = await ProductModel.find({$or:[{ title:{$regex: /áo/i}}  ,{description: {$regex: /áo/i} }] })
```
## Danh sách sản phẩm không thể bán (hết số lượng tồn kho)
```
const products = await ProductModel.find({stockQuantity:{$eq:0}})
```
## Danh sách sản phẩm được đánh giá cao (có rating lớn hơn hoặc bằng 4)
```
const products = await ProductModel.find({rating:{$gte:4}})
```
## Danh sách sản phẩm trending (có lượt view từ 2000) sắp xếp theo chiều giảm dần số view
```
const products = await ProductModel.find({viewCount:{$gte:2000}}).sort({viewCount:-1})
```
## Danh sách sản phẩm có tags là "nam"
```
const products = await ProductModel.find({tags:"nam"})
```
## Danh sách sản phẩm theo giá bán tăng dần
```
const products = await ProductModel.find().sort({price:1})
```
## Danh sách sản phẩm thuộc danh mục "Quần áo" bán chạy (số lượng bán ra lớn hơn 100) sắp xếp theo bảng chữ cái alphabet tăng dần của title
```
const products = await ProductModel.find({$and: [{sellQuantity:{$gte:100}},{category:"Quần áo"}]}).sort({ title:1 })
```
## [Nâng cao] Cho từ khoá "khăn quang" (Người dùng nhập từ khăn có dấu còn từ quàng không có dấu), làm thế nào để ra được danh sách các sản phẩm có từ khoá "khăn quàng"
```
const slugify = require('slugify');
<!-- chỗ này em tính dùng slugify nhưng mà em thấy không ổn lắm nên dùng tạm replace rồi nghiên cứu slugify tiếp ạ =))) -->
const getProducs = async (req, res, next) => {
   const { keyword } = req.query;
    let filter = {};
    if (keyword) {
        const keywordSlug = keyword.replace("a", "à");
        filter = { title: keywordSlug };
        console.log(keywordSlug);
    }
    console.log(filter);
    const Products = await ProductModel.find(filter);
    if (!Products) {
        throw new HttpError("Something broke!");
    }
    res.send({ success: 1, data: Products });
}
```