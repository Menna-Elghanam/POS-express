import { Router } from "express";
import { sample_foods, sample_tags } from "../data/data.js";

const router = Router();

// food api
router.get("/", (req, res) => {
  res.send(sample_foods);
});

router.get("/tags", (req, res) => {
  res.send(sample_tags);
});
router.get("/search/:serchTerm", (req, res) => {
  // get searchTerm from route params
  const { serchTerm } = req.params;

  const foods = sample_foods.filter((food) =>
    food.name.toLowerCase().includes(serchTerm)
  );
  res.send(foods);
});

router.get('/tag/:tagTerm',(req,res)=>{
const {tagTerm}=req.params;
const tags= sample_foods.filter((item)=>item.tagTerm?.includes(tagTerm))
res.send(tags)

})

router.get('/:foodId',(req,res)=>{
  const {foodId}=req.params
  const food =sample_foods.find((food) => food.id === foodId)
  res.send(food)

})



export default router;
