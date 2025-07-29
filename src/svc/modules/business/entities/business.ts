import { Column, Entity, OneToMany } from "typeorm";
import { Metadata } from "~src/svc/modules/common/entities";
import { BusinessTypeEnum } from "~src/svc/modules/business/enums";
import { BusinessBookTopology } from "~src/svc/modules/business/entities/business-book-topology";

@Entity({ name: "business" })
export class Business extends Metadata {
  @Column({ type: "varchar", length: 255 })
  name!: string;

  @Column({ type: "varchar", length: 255 })
  address!: string;

  @Column({ type: "varchar", length: 15 })
  phone!: string;

  @Column({ type: "enum", enum: BusinessTypeEnum })
  type!: BusinessTypeEnum;

  @Column({ type: "float", default: 20 })
  defaultCut!: number;

  @OneToMany(() => BusinessBookTopology, (e) => e.business)
  businessBookTopology!: BusinessBookTopology[];
}
