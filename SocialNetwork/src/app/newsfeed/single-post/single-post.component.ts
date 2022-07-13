import { Component, Input, OnInit } from '@angular/core';
import { CommentItem } from 'src/app/model/comment-model';
import { Post } from 'src/app/model/objava-model';
import { NewsfeedService } from 'src/app/service/newsfeed.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewCommentComponent } from 'src/app/new-comment/new-comment.component';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent implements OnInit {
  @Input() objava: Post = new Post();
  comments: CommentItem[] = [];

  params = {
    sort: 'rating',
    sortDirection: 'desc',
  };
  currentRate = 5;

  constructor(
    private service: NewsfeedService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.getComments();
  }

  getComments() {
    this.service.getComments(this.objava._id, this.params).subscribe({
      next: (data: CommentItem[]) => {
        // console.log(data);
        this.comments = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  img(picture: string) {
    if (picture == '') {
      return 'assets/images/default.jpg';
    } else {
      return 'assets/images/' + picture;
    }
  }

  open() {
    const modalRef = this.modalService.open(NewCommentComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.objava = this.objava;
  }
}
