package com.generalsoftware.kangab.model;

import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "cards")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
@ToString
public class Card extends BaseModel {

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(name = "card_order", nullable = false)
    private int order;

    @Enumerated(EnumType.STRING)
    private Priority priority;

    @ManyToOne
    @JoinColumn(name = "column_id", nullable = false)
    private com.generalsoftware.kangab.model.Column column;

    @JoinTable(name = "card_users", joinColumns = @JoinColumn(name = "card_id", nullable = false), inverseJoinColumns = @JoinColumn(name = "user_id", nullable = false))
    @ManyToMany
    private List<User> users;

    @CreationTimestamp
    @Column(name = "create_date")
    private Date creationDate;

    @UpdateTimestamp
    @Column(name = "modification_date")
    private Date modificationDate;

}
