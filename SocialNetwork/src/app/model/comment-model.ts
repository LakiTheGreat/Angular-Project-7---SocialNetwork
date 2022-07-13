import { User } from './objava-model';

export class CommentItem {
  _id: number;
  posts: number;
  user: User;
  rating: number;
  text: string;
  date: Date;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.posts = (obj && obj.posts) || '';
    this.user = (obj && new User(obj.user)) || new User();
    this.rating = (obj && obj.rating) || 0;
    this.text = (obj && obj.text) || '';
    this.date = (obj && new Date(obj.date)) || new Date();
  }
}
