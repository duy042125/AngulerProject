import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';
import { CrudService } from './crud.service';
import { LESSONS } from 'backend/db'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit
{

  Users: any = [];

  dataSource = LESSONS;
  displayedColumns = ["seqNo", "description", "duration"];

  constructor(public crudService: CrudService) { }

  //Assignment #2
  ngOnInit()
  {
    this.fetchUsers()
  }

  fetchUsers()
  {
    return this.crudService.getUsers().subscribe((data: {}) =>
    {
      this.Users = data;
    })
  }

  remove(id)
  {
    this.crudService.delete(id).subscribe(res =>
    {
      this.fetchUsers()
    })
  }

  //Assignment #3
  onRowClicked(row)
  {
    console.log('Row clicked: ', row);
  }

}

export interface Lesson
{
  id: number;
  description: string;
  duration: string;
  seqNo: number;
  courseId: number;
}

@Injectable()
export class CoursesService
{

  constructor(private http: HttpClient) { }

  findLessons(
    courseId: number, filter = '', sortOrder = 'asc',
    pageNumber = 0, pageSize = 3): Observable<Lesson[]>
  {

    return this.http.get('/api/lessons', {
      params: new HttpParams()
        .set('courseId', courseId.toString())
        .set('filter', filter)
        .set('sortOrder', sortOrder)
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString())
    }).pipe(
      map(res => res["payload"])
    );
  }
}