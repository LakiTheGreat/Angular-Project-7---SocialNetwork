import { Component, OnInit } from '@angular/core';
import { Post, postList } from '../model/objava-model';
import { NewsfeedService } from '../service/newsfeed.service';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})
export class NewsfeedComponent implements OnInit {
  posts: postList = new postList();
  posts2: Post[] = [];
  params = {
    page: 1,
    pageSize: 4,
    sort: 'date',
    sortDirection: 'asc',
  };

  constructor(private service: NewsfeedService) {}

  ngOnInit(): void {
    this.getPosts();
    this.getPosts2();
  }

  getPosts() {
    this.service.getPosts(this.params).subscribe({
      next: (data: any) => {
        // console.log(data);
        this.posts = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getPosts2() {
    this.service.getPosts2().subscribe({
      next: (data: Post[]) => {
        console.log('Dole');
        console.log(data);
        this.posts2 = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onLoadMore() {
    this.params.pageSize = this.params.pageSize + 4;

    this.getPosts();
  }
}
