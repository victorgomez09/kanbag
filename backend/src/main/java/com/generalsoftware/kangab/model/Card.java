package com.generalsoftware.kangab.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "cards")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Card extends BaseModel {

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name="card_order", nullable = false)
    private int order;

    @ManyToOne
    @JoinColumn(name = "column_id", nullable = false)
    private com.generalsoftware.kangab.model.Column column;

    @OneToMany
    @JoinColumn(name = "card_id", referencedColumnName = "id")
    private List<User> users;

    @CreationTimestamp
    @Column(name = "create_date")
    private Date creationDate;

    @UpdateTimestamp
    @Column(name = "modification_date")
    private Date modificationDate;

}
