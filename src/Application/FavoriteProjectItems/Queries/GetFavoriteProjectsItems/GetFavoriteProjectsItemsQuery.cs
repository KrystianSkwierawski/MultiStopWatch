﻿using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Project.Application.Common.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Project.Application.FavoriteProjectItems.Queries.GetFavoriteProjectsItems
{
    public class GetFavoriteProjectsItemsQuery : IRequest<List<FavoriteProjectItemDto>>
    {
        public class GetFavoriteProjectsItemsQueryHandler : IRequestHandler<GetFavoriteProjectsItemsQuery, List<FavoriteProjectItemDto>>
        {
            private readonly IContext _context;
            private readonly IMapper _mapper;

            public GetFavoriteProjectsItemsQueryHandler(IContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<List<FavoriteProjectItemDto>> Handle(GetFavoriteProjectsItemsQuery request, CancellationToken cancellationToken)
            {
                return await _context.ProjectItems
                 .Where(x => x.IsFavorite == true)
                 .OrderByDescending(x => x.Id)
                 .ProjectTo<FavoriteProjectItemDto>(_mapper.ConfigurationProvider)
                 .ToListAsync(cancellationToken);
            }
        }
    }
}