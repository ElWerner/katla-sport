import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HiveSection } from '../models/hive-section';
import { HiveSectionService } from '../services/hive-section.service';
import { HiveSectionListItem } from '../models/hive-section-list-item';

@Component({
  selector: 'app-hive-section-form',
  templateUrl: './hive-section-form.component.html',
  styleUrls: ['./hive-section-form.component.css']
})
export class HiveSectionFormComponent implements OnInit {

  hiveSection = new HiveSection(0, "New Hive Section Name", "HSE0", 0, false, "");
  existed = false;
  hiveId: number;
  hiveSections: Array<HiveSectionListItem>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sectionService: HiveSectionService,
  ) { }

  ngOnInit() {
    this.sectionService.getHiveSections().subscribe(s => this.hiveSections = s);
    this.route.params.subscribe(p => {
      this.hiveId = p['hiveId'];
      this.hiveSection.storeHiveId = p['hiveId'];
      if (p['id'] === undefined) return;
      this.sectionService.getHiveSection(p['id']).subscribe(s => this.hiveSection = s);
      this.existed = true;
    })
  }

  navigateToHiveSections() {
    if (this.hiveId === undefined) {
      this.router.navigate(['/hives']);
    } else {
      this.router.navigate([`/hive/${this.hiveId}/sections`]);
    }
  }

  onSubmit() {
    if (this.existed) {
      this.sectionService.updateHiveSection(this.hiveSection).subscribe(c => this.navigateToHiveSections());
    } else {
      this.sectionService.addHiveSection(this.hiveSection).subscribe(c => this.navigateToHiveSections());
    }
  }

  onDelete() {
    this.sectionService.setHiveSectionStatus(this.hiveSection.id, true).subscribe(c => this.hiveSection.isDeleted = true);
  }

  onUndelete() {
    this.sectionService.setHiveSectionStatus(this.hiveSection.id, false).subscribe(c => this.hiveSection.isDeleted = false);
  }

  onPurge() {
    this.sectionService.deleteHiveSection(this.hiveSection.id).subscribe(c => this.navigateToHiveSections());
  }
}