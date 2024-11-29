import { Component, OnInit } from '@angular/core';
import { CardModule } from '@coreui/angular';
import { TableModule } from '@coreui/angular';
import { AuthService } from 'src/services/auth.service';
import { UserService } from "src/services/user.service"
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-system-user',
  templateUrl: './system-user.component.html',
  styleUrls: ['./system-user.component.scss'],
  standalone: true,
  imports: [CardModule, TableModule, CommonModule]
})
export class SystemUserComponent implements OnInit {

  userList: any[] = []

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserList().then((res: any) => {
      res.map((item: any) => this.userList.push(item))
    })
  }
}
