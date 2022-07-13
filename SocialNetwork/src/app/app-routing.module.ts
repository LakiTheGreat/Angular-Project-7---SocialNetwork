import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotTopicComponent } from './core/hot-topic/hot-topic.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';

const routes: Routes = [
  { path: 'hot', component: HotTopicComponent },
  { path: 'news', component: NewsfeedComponent },
  // { path: "cakes/:id", component: CakeDetailsComponent },

  { path: '', redirectTo: '/news', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
