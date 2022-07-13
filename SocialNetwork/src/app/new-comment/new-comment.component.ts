import { Component, Input, OnInit } from '@angular/core';
import { CommentItem } from '../model/comment-model';
import { Post } from '../model/objava-model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewsfeedService } from '../service/newsfeed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css'],
})
export class NewCommentComponent implements OnInit {
  @Input() objava: Post = new Post();
  newComment: CommentItem = new CommentItem();

  constructor(
    public activeModal: NgbActiveModal,
    private service: NewsfeedService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSave() {
    this.newComment.user.name = 'Nikola Lakobrija';
    this.newComment.date = new Date();
    this.newComment.rating = 0;
    this.postComment();
  }

  postComment(): void {
    this.service.postComment(this.objava._id, this.newComment).subscribe({
      next: (data: CommentItem) => {
        console.log(data);
        this.refresh();
      },
      error: (err: any) => alert(JSON.stringify(err)),
    });
  }

  refresh(): void {
    window.location.reload();
  }
}
