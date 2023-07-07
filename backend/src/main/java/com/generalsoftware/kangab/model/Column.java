package com.generalsoftware.kangab.model;

import java.io.Serial;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "columns")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder(toBuilder = true)
public class Column extends BaseModel {

    @Serial
    private static final long serialVersionUID = -467324267912994552L;

    @jakarta.persistence.Column(name = "name", nullable = false)
    private String name;

    @jakarta.persistence.Column(name = "column_order", nullable = false)
    private Long order;

    @Builder.Default
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "column")
    private List<Card> cards = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "board_id", nullable = false)
    private Board board;

    @CreationTimestamp
    @jakarta.persistence.Column(name = "creation_date")
    private Date creationDate;

    @UpdateTimestamp
    @jakarta.persistence.Column(name = "modification_date")
    private Date modificationDate;

}
