import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {

  loadedRecipe:Recipe;

  constructor(private recipeService:RecipesService, private activatedRoute:ActivatedRoute, private router:Router, private alrtController:AlertController) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramData=>{
      if(!paramData.has("recipeId")){
        //redirect
        return;
      }
      this.loadedRecipe=this.recipeService.getRecipeById(paramData.get("recipeId"));
    })
  }

  onDeleteRecipe(){
    this.alrtController.create({
      header:"Are You Sure?", 
      message:"Do You Want to Delete This Recipe?", 
      buttons:[{
        text:"Cancel",
        role:"cancel"
      },
      {
        text:"Delete",
        handler:()=>{
          this.recipeService.deleteRecipe(this.loadedRecipe.id);
          this.router.navigate(["/recipes"]);
        }
      }]
    }).then(alrt=>{
      alrt.present();
    })
    
  }

}
