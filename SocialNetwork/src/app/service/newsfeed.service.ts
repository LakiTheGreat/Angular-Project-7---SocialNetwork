import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CommentItem } from '../model/comment-model';
import { Post, postList } from '../model/objava-model';

const baseUrl = 'http://localhost:3000/api/';
@Injectable({
  providedIn: 'root',
})
export class NewsfeedService {
  constructor(private http: HttpClient) {}

  getPosts(params?: any): Observable<postList> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || ''),
      };
    }
    return this.http.get(`${baseUrl}posts`, options).pipe(
      map((data: any) => {
        // console.log(data);
        return new postList(data);
      })
    );
  }

  getPosts2(params?: any): Observable<Post[]> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('page', params.page || '')
          .set('pageSize', params.pageSize || '')
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || ''),
      };
    }
    return this.http.get(`${baseUrl}posts`, options).pipe(
      map((data: any) => {
        // console.log(data);
        return (
          (data.postList && data.postList.map((x: any) => new Post(x))) || []
        );
      })
    );
  }

  getComments(postId: number, params?: any): Observable<CommentItem[]> {
    let options = {};
    if (params) {
      options = {
        params: new HttpParams()
          .set('sort', params.sort || '')
          .set('sortDirection', params.sortDirection || ''),
      };
    }
    return this.http.get(`${baseUrl}posts/${postId}/comments`, options).pipe(
      map((data: any) => {
        return (data && data.map((elem: any) => new CommentItem(elem))) || [];
      })
    );
  }

  postComment(postId: number, comment: CommentItem): Observable<any> {
    return this.http.post(`${baseUrl}posts/${postId}/comments`, comment).pipe(
      map((data: any) => {
        return new CommentItem(data);
      })
    );
  }
}
